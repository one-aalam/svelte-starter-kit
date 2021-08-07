
export type AjaxActionProps = {
    onSubmit?: (data) => void,
    onResponse?: (data) => void,
}

const AjaxActionDefaults = {
    onSubmit: (data) => {},
    onResponse: (data) => {},
}

export const ajaxify = (node: HTMLFormElement, { onSubmit = AjaxActionDefaults.onSubmit , onResponse =  AjaxActionDefaults.onResponse }: AjaxActionProps) => {
	const handleSubmit = async (event) => {
		event.preventDefault()
		const body = node.method === 'post' || node.method === 'put' ? new FormData(node) : null
        onSubmit(body)

		const resp = await fetch(node.action, {
			method: node.method,
			body,
			headers: {
				accept: 'application/json'
			}
		});

		onResponse(resp)
	};

	node.addEventListener('submit', handleSubmit)

	return {
		destroy() {
			node.removeEventListener('submit', handleSubmit)
		}
	}
}
