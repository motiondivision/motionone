import type { NextApiRequest, NextApiResponse } from "next"
import { Octokit } from "@octokit/core"
// const { Webhooks } = require("@octokit/webhooks");

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
})

// const webhooks = new Webhooks({
//   secret: process.env.SPONSOR_SECRET,
// });

type SponsorshipAction =
  | "created"
  | "cancelled"
  | "edited"
  | "tier_changed"
  | "pending_cancellation"
  | "pending_tier_change"

interface GithubUser {
  login: string
  id: number
}

interface SponsorshipTier {
  monthly_price_in_dollars: number
  is_one_time: boolean
}

interface SponsorshipBody {
  action: SponsorshipAction
  sender: GithubUser
  sponsorship: {
    sponsor: GithubUser
    tier: SponsorshipTier
  }
}

interface SponsorshipActionHandlers {
  [key: string]: (
    body: SponsorshipBody,
    res: NextApiResponse
  ) => Promise<string>
}

const repo = {
  owner: "motiondivision",
  repo: "motionone",
}

const actionHandlers: SponsorshipActionHandlers = {
  created: async ({ sponsorship }, res) => {
    if (typeof sponsorship === "string") {
      sponsorship = JSON.parse(sponsorship)
    }
    const { tier, sponsor } = sponsorship

    let responseMessage = ""

    if (tier.is_one_time) {
      responseMessage = "One time"
    } else if (tier.monthly_price_in_dollars >= 5) {
      const addContributorResponse = await octokit.request(
        `PUT /repos/{owner}/{repo}/collaborators/{username}`,
        {
          ...repo,
          username: sponsor.login,
          permission: "pull",
        }
      )

      if (addContributorResponse.status === 201) {
        responseMessage += "User successfully invited to repo "
      } else {
        res.status(500)
      }
    } else {
      responseMessage = "Small monthly amount"
    }

    return responseMessage
  },
  cancelled: async ({ sender }, _res) => {
    if (typeof sender === "string") {
      sender = JSON.parse(sender)
    }

    const invitationsResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/invitations",
      repo
    )

    if (invitationsResponse.status === 200) {
      const userInvite = invitationsResponse.data.find(({ invitee }: any) => {
        return invitee.login === sender.login
      })

      if (userInvite) {
        const { id } = userInvite
        try {
          await octokit.request(
            "DELETE /repos/{owner}/{repo}/invitations/{invitation_id}",
            { ...repo, invitation_id: id }
          )
        } catch (e) {
          // res.status(401).json({ message: "" })
        }
      }
    }

    octokit.request("DELETE /repos/{owner}/{repo}/collaborators/{username}", {
      ...repo,
      username: sender.login,
    })

    return "User successfully removed from repo"
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (requestIsValid(req)) {
  //   res.status(404).json({});
  //   return;
  // }

  const { body } = req
  let result = `No action taken for ${body.action}`
  const handler = actionHandlers[body.action]

  if (handler) {
    result = await handler(body, res)
  }

  res.status(200).json({ result })
}
