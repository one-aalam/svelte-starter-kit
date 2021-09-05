
export const modalEvtBindings = (node: HTMLElement) => {

    const handleKeydown = (e: KeyboardEvent) => {
        e.stopPropagation()
        if (e.key === 'Escape') {
            node.dispatchEvent(new CustomEvent('esc', {
                detail: {}
            }));
        }
    }

    const handleTransitionEnd = (e: TransitionEvent) => {
        const node = e.target as HTMLElement
        node.focus()
    }

    node.addEventListener('transitionend', handleTransitionEnd)
    node.addEventListener('keydown', handleKeydown)
    node.focus()

    return {
        destroy: () => {
            node.removeEventListener('transitionend', handleTransitionEnd)
            node.removeEventListener('keydown', handleKeydown)
        }
    }
}
