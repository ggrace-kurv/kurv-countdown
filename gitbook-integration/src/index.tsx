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
        return (
            <block>
                <webframe source={{ url: element.props.url ?? COUNTDOWN_URL }} aspectRatio={600 / 140} />
            </block>
        );
    },
});

export default createIntegration({
    components: [countdownBlock],
});
