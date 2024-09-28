import { useIdb } from "@/utils/localforage";
import { ref } from "vue";
import { Mention } from "../Mentions";

interface message {
    id: string;
    titleMessage: string;
    message: string;
    contacts: string[]
}

export const messageData = ref<message[]>([])

export class Message {

    private db = useIdb('messages');
    constructor () {
        this.messageRetrieve();
    }

    async messageAppend (message: message) {

        const isNotOkeToSend = !message.titleMessage  || !message.message;
        if(isNotOkeToSend) return;

        await this.db.createItem(message);
        await this.messageRetrieve();
    }

    async messageUpdate (message: message) {
        const isNotOkeToSend = !message.id  || !message.titleMessage  || !message.message;
        if(isNotOkeToSend) return;
        await this.db.updateItem(message.id, message);
        await this.messageRetrieve();
    }

    async messageUpdateContacts (idMessage: string, contacts: string[]) {
        if(!idMessage) return;
        await this.db.updateItem(idMessage, { contacts });
    }

    async messageRetrieve() {
        const data = await this.db.getItems<message>();
        if(!data.length) return;
        messageData.value = data
    }

    async messageGetById(id: string) {
        const data = await this.db.getItem<message>(id);
        if(!data?.id) return;
        return data;
    }
}