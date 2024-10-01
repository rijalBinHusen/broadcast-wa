import { useIdb } from "@/utils/localforage";
import { ref } from "vue";
import { Contact, contactData, type contact } from "../Contacts";

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

    async messageReplacePlaceholder(message: string, contactId: string): Promise<{message: string, contact: contact}> {

        let result = message;
        let contactInfo = <contact>{}
        
        const isThereContactPlaceholder = message.indexOf("{{contact");
        
        
        const contactOperation = new Contact();
        const getContact = await contactOperation.contactGetById(contactId);
        
        if(getContact != undefined) {
            
            contactInfo = getContact;    
            if(isThereContactPlaceholder > -1) {
                result = result.replace(/{{contact.name}}/g, contactInfo.name);
                if(contactInfo.mentionName) {
                    result = result.replace(/{{contact.mention}}/g, contactInfo.mentionName);
                }
            }

        }

        // replace date of time
        const currentWeek = new Date();
        const nextWeekDate = new Date();
        nextWeekDate.setDate(currentWeek.getDate() + 7);
        const dayInNumber = currentWeek.getDay();
        const hoursADayInTime = 1000 * 60  * 60 * 24;

        
        if(dayInNumber > 0)  {
            currentWeek.setDate(currentWeek.getDate() - dayInNumber);
            nextWeekDate.setDate(nextWeekDate.getDate() - dayInNumber);
        }
    
        const next1stDayOfWeek = dayInNumber > 0 ? nextWeekDate : currentWeek ;
        const next2ndDayOfWeek = dayInNumber > 1 ? new Date(nextWeekDate.getTime() + (1 * hoursADayInTime)) : new Date(currentWeek.getTime() + (1 * hoursADayInTime)) ;
        const next3rdDayOfWeek = dayInNumber > 2 ? new Date(nextWeekDate.getTime() + (2 * hoursADayInTime)) : new Date(currentWeek.getTime() + (2 * hoursADayInTime)) ;
        const next4thDayOfWeek = dayInNumber > 3 ? new Date(nextWeekDate.getTime() + (3 * hoursADayInTime)) : new Date(currentWeek.getTime() + (3 * hoursADayInTime)) ;
        const next5thDayOfWeek = dayInNumber > 4 ? new Date(nextWeekDate.getTime() + (4 * hoursADayInTime)) : new Date(currentWeek.getTime() + (4 * hoursADayInTime)) ;
        const next6thDayOfWeek = dayInNumber > 5 ? new Date(nextWeekDate.getTime() + (5 * hoursADayInTime)) : new Date(currentWeek.getTime() + (5 * hoursADayInTime)) ;
        const next7thDayOfWeek = dayInNumber > 6 ? new Date(nextWeekDate.getTime() + (6 * hoursADayInTime)) : new Date(currentWeek.getTime() + (6 * hoursADayInTime)) ;
        
        // replace next1stDayOfWeekAsDay
        result = result.replace(/{{next1stDayOfWeekAsDay}}/g, next1stDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next2ndDayOfWeekAsDay}}/g, next2ndDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next3rdDayOfWeekAsDay}}/g, next3rdDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next4thDayOfWeekAsDay}}/g, next4thDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next5thDayOfWeekAsDay}}/g, next5thDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next6thDayOfWeekAsDay}}/g, next6thDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        result = result.replace(/{{next7thDayOfWeekAsDay}}/g, next7thDayOfWeek.toLocaleString('id-ID', { weekday: 'long' }));
        
        // replace next1stDayOfWeekAsDate
        result = result.replace(/{{next1stDayOfWeekAsDate}}/g, next1stDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next2ndDayOfWeekAsDate}}/g, next2ndDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next3rdDayOfWeekAsDate}}/g, next3rdDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next4thDayOfWeekAsDate}}/g, next4thDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next5thDayOfWeekAsDate}}/g, next5thDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next6thDayOfWeekAsDate}}/g, next6thDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));
        result = result.replace(/{{next7thDayOfWeekAsDate}}/g, next7thDayOfWeek.toLocaleString('id-ID', { dateStyle: 'long' }));

        return {
            message: result,
            contact: contactInfo
        }
    }
}