import { useIdb } from "@/utils/localforage";
import { ref } from "vue";
import { Contact } from "../Contacts";

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
        messageData.value = data.map((datum) => ({ ...datum, message: datum.message.substring(0, 40) }))
    }

    async messageGetById(id: string) {
        const data = await this.db.getItem<message>(id);
        if(!data?.id) return;
        return data;
    }

    async messageReplacePlaceholder(message: string, contactId: string): Promise<string> {

        let result = message;
        
        const isThereContactPlaceholder = message.indexOf("{{contact");
        
        if(isThereContactPlaceholder > -1) {
            
            const contactOperation = new Contact();
            const contactInfo = await contactOperation.contactGetById(contactId);
            if(contactInfo) {
    
                result = result.replace(/{{contact.name}}/g, contactInfo.name);
                if(contactInfo.mentionName) {
                    result = result.replace(/{{contact.mention}}/g, contactInfo.mentionName);
                }
            }

        }

        // replace date of time
        const currentDate = new Date();
        const next1stDayOfWeek = currentDate.getDay() > 0 ? 7 - currentDate.getDay() : 0 ;
        const next2ndDayOfWeek = currentDate.getDay() > 1 ? 7 - currentDate.getDay() : 1 ;
        const next3rdDayOfWeek = currentDate.getDay() > 2 ? 7 - currentDate.getDay() : 2 ;
        const next4thDayOfWeek = currentDate.getDay() > 3 ? 7 - currentDate.getDay() : 3 ;
        const next5thDayOfWeek = currentDate.getDay() > 4 ? 7 - currentDate.getDay() : 4 ;
        const next6thDayOfWeek = currentDate.getDay() > 5 ? 7 - currentDate.getDay() : 5 ;
        const next7thDayOfWeek = currentDate.getDay() > 6 ? 7 - currentDate.getDay() : 6 ;

        const days = {
            next1stDayOfWeek: new Date(new Date().setDate(currentDate.getDate() + next1stDayOfWeek)),
            next2ndDayOfWeek: new Date(new Date().setDate(currentDate.getDate() + next2ndDayOfWeek)),
            next3rdDayOfWeek: new Date(new Date().setDate(currentDate.getDate() + next3rdDayOfWeek)),
            next4thDayOfWeek: new Date(new Date().setDate(currentDate.getDate() + next4thDayOfWeek)),
            next5thDayOfWeek: new Date(new Date().setDate(currentDate.getDate() + next5thDayOfWeek)),
            next6thDayOfWeek: new Date(new Date().setDate(currentDate.getDate() + next6thDayOfWeek)),
            next7thDayOfWeek: new Date(new Date().setDate(currentDate.getDate() + next7thDayOfWeek)),
        }
        
        // replace next1stDayOfWeekAsDay
        result = result.replace(/{{next1stDayOfWeekAsDay}}/g, days.next1stDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next2ndDayOfWeekAsDay}}/g, days.next2ndDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next3rdDayOfWeekAsDay}}/g, days.next3rdDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next4thDayOfWeekAsDay}}/g, days.next4thDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next5thDayOfWeekAsDay}}/g, days.next5thDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next6thDayOfWeekAsDay}}/g, days.next6thDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next7thDayOfWeekAsDay}}/g, days.next7thDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        
        // replace next1stDayOfWeekAsDate
        result = result.replace(/{{next1stDayOfWeekAsDate}}/g, days.next1stDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next2ndDayOfWeekAsDate}}/g, days.next2ndDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next3rdDayOfWeekAsDate}}/g, days.next3rdDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next4thDayOfWeekAsDate}}/g, days.next4thDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next5thDayOfWeekAsDate}}/g, days.next5thDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next6thDayOfWeekAsDate}}/g, days.next6thDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next7thDayOfWeekAsDate}}/g, days.next7thDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));

        return result;
    }
}