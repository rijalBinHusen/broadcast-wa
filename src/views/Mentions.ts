import { useIdb } from "@/utils/localforage";

interface mention {
    id: string;
    mention: string
}

class Mention {

    db = useIdb('mentions');
    constructor () {
        
    }

    mentionAppend (mention: string) {
        if(mention == "") return;

        this.db.createItem(mention)
    }

    mentionUpdate (id: string, mention: string) {
        if(id == "" || mention == "") return;

        this.db.updateItem(id, { mention })
    }

    async mentionRetrieve() {
        const data = await this.db.getItems<mention>()
    }
}