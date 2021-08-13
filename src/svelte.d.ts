declare namespace svelte.JSX {
    interface HTMLProps<T> {
        out?: (e: CustomEvent) => void;
        esc?: (e: CustomEvent) => void;
    }
}
