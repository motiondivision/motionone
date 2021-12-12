import { signIn } from "next-auth/client";
import styled from "styled-components";

export function Login() {
  return (
    <div>
      <Sponsor
        href="https://github.com/sponsors/mattgperry"
        className="primary-cta"
      >
        Become a sponsor
      </Sponsor>
      <LoginButton as="button" onClick={() => signIn("github")}>
        Login
      </LoginButton>
    </div>
  );
}

const Sponsor = styled.a`
  font-size: 2.2rem;
  line-height: 1.7;
  letter-spacing: -0.3px;
  color: var(--foreground);
  border-radius: 40px;
  line-height: 1.2;
  letter-spacing: -0.1rem;
  font-weight: 700;
  font-family: "Inter-Bold", "Inter", sans-serif;
  color: var(--foreground);
  padding: 14px 21px 14px;
  border: 2px solid var(--secondary);
  background-color: var(--secondary);
  text-decoration: none;
  padding: 14px 21px 14px;
`;

const LoginButton = styled(Sponsor)`
  margin-left: 20px;
  background-color: transparent;
  --webkit-appearance: button;
`;
