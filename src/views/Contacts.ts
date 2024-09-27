import { useIdb } from "@/utils/localforage";
import { ref } from "vue";
import { Mention } from "./Mentions";

interface contact {
    id: string;
    name: string;
    phone: number;
    mention: string;
    mentionName?: string;
}

export const contactData = ref<contact[]>([])

export class Contact {

    private db = useIdb('contacts');
    constructor () {
        this.contactRetrieve();
    }

    async contactAppend (contact: contact) {

        const isNotOkeToSend = !contact.name  || !contact.phone || !contact.mention;
        
        if(isNotOkeToSend) return;

        await this.db.createItem(contact);
        await this.contactRetrieve();
    }

    async contactUpdate (contact: contact) {
        const isNotOkeToSend = !contact.id  || !contact.name  || !contact.phone || !contact.mention;
        if(isNotOkeToSend) return;
        await this.db.updateItem(contact.id, contact);
        await this.contactRetrieve();
    }

    async contactRetrieve() {
        contactData.value.length = 0
        const data = await this.db.getItems<contact>();
        if(!data.length) return;
        for(let datum of data) {
            const mentionOperation = new Mention();
            const mention = await mentionOperation.mentionGetById(datum.mention);
            contactData.value.push({ ...datum, mentionName: mention?.mention });
        }
    }

    async contactGetById(id: string) {
        const data = await this.db.getItem<contact>(id);
        if(!data?.id) return;
        return data;
    }
}