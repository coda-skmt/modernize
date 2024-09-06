export const useAnimate = () => {
    const animate = (element: HTMLElement, animationClass: string) => {
        if (!element) return

        // 添加 animate__animated 和传入的动画类
        element.classList.add('animate__animated', animationClass)

        // 监听动画结束事件，移除类
        const handleAnimationEnd = () => {
            element.classList.remove('animate__animated', animationClass)
            element.removeEventListener('animationend', handleAnimationEnd)
        }

        element.addEventListener('animationend', handleAnimationEnd)
    }

    return {
        animate
    }
}
