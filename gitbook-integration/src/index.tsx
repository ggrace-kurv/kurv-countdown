import { createIntegration, createComponent } from '@gitbook/runtime';

const COUNTDOWN_URL = 'https://ggrace-kurv.github.io/kurv-countdown/';

/**
 * Renders the hosted countdown page in a webframe. Pasting a countdown URL
 * into the editor unfurls into this block.
 */
const countdownBlock = createComponent<{ url?: string }>({
    componentId: 'countdown',

    async action(element, action) {
        if (action.action === '@link.unfurl') {
            return { props: { url: action.url } };
        }
        return element;
    },

    async render(element) {
        // GitHub Pages sends max-age=600; a per-render query param keeps the frame fresh.
        const src = new URL(element.props.url ?? COUNTDOWN_URL);
        src.searchParams.set('v', Date.now().toString());
        return (
            <block>
                <webframe source={{ url: src.toString() }} aspectRatio={4.6} />
            </block>
        );
    },
});

export default createIntegration({
    components: [countdownBlock],
});
