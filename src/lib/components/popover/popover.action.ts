export const popoverBindings = (node: HTMLElement) => {
    const handleOutsideClick = (e) => {
        if (!node.contains(e.target)) {
            node.dispatchEvent(new CustomEvent('out', {
                detail: {}
            }));
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        e.stopPropagation()
        if (e.key === 'Escape') {
            node.dispatchEvent(new CustomEvent('esc', {
                detail: {}
            }));
        }
    }

    window.addEventListener('click', handleOutsideClick)
    node.addEventListener('keydown', handleKeydown)
    return {
        destroy: () => {
            window.removeEventListener('click', handleOutsideClick)
            node.removeEventListener('keydown', handleKeydown)
        }
    }
}
