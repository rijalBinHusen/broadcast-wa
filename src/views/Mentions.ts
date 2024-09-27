import { useIdb } from "@/utils/localforage";
import { ref } from "vue";

interface mention {
    id: string;
    mention: string
}

export const mentionsData = ref<mention[]>([])

export class Mention {

    private db = useIdb('mentions');
    constructor () {
        this.mentionRetrieve();
    }

    async mentionAppend (mention: string) {
        if(mention == "") return;
        await this.db.createItem({ mention });
        await this.mentionRetrieve();
    }

    async mentionUpdate (id: string, mention: string) {
        if(id == "" || mention == "") return;
        await this.db.updateItem(id, { mention });
        await this.mentionRetrieve();
    }

    async mentionRetrieve() {
        const data = await this.db.getItems<mention>();
        if(!data.length) return;
        mentionsData.value = data;
    }

    async mentionGetById(id: string) {
        const data = await this.db.getItem<mention>(id);
        if(!data?.id) return;
        return data;
    }
}