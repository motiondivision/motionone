import { component$, Slot, useVisibleTask$, useSignal } from "@builder.io/qwik"
import {
  createMotionState,
  createStyles,
  CSSStyleDeclarationWithTransform,
  MotionKeyframes,
} from "@motionone/dom"
import {
  MotionComponentProps,
  MotionProxy,
  MotionProxyComponent,
} from "./types"

export const MotionComponent = component$<
  MotionComponentProps & {
    tag?: string
    ref?: any
    style?: MotionKeyframes
  }
>((props) => {
  const {
    tag,
    initial,
    animate,
    hover,
    press,
    inView,
    inViewOptions,
    variants,
    transition,
    // exit,
    style,
    ...rest
  } = props

  if (!tag) {
    throw new Error("tag required")
  }

  const Wrapper: any = tag

  const element = useSignal<HTMLElement>()

  const style_signal = useSignal<CSSStyleDeclarationWithTransform>(
    createStyles(style)
  )

  useVisibleTask$(({ track }) => {
    track(() => [
      initial,
      animate,
      hover,
      press,
      inView,
      inViewOptions,
      variants,
      transition,
    ])

    const state = createMotionState({
      initial,
      animate,
      hover,
      press,
      inView,
      inViewOptions,
      variants,
      transition,
    })

    if (element.value) {
      if (!state?.isMounted()) {
        state?.mount(element.value)
      }

      state?.update({
        initial,
        animate,
        hover,
        press,
        inView,
        inViewOptions,
        variants,
        transition,
      })
    }
  })

  return (
    <Wrapper
      ref={element}
      style={{
        ...style_signal.value,
        ...(typeof initial === "object" && initial),
      }}
      {...rest}
    >
      <Slot />
    </Wrapper>
  )
})

export const Motion = new Proxy(MotionComponent, {
  get:
    (_, tag: string): MotionProxyComponent<any> =>
    (props) => {
      delete props.tag
      return <MotionComponent {...props} tag={tag} />
    },
}) as unknown as MotionProxy
