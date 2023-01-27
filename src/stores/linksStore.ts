import { reactive } from "vue";

export const linksStore = reactive({
    links: [{ id: 1, name: "Todo list", isActive: false, to: "/" }],
    changeActive(id: number) {
        linksStore.links.forEach((link) => {
            if (link.id === id) {
                link.isActive = !link.isActive;
            } else {
                link.isActive = false;
            }
        });
    },
});
