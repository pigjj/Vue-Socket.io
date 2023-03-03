import SocketIOClient from "socket.io-client";
// @ts-ignore
import { DefaultComputed, DefaultData, DefaultMethods, DefaultProps, PropsDefinition, } from "vue/types/options";
// @ts-ignore
import { Vue } from "vue/types/vue";
// @ts-ignore
import { PluginFunction, PluginObject } from "vue";
// @ts-ignore
import { Store } from "vuex";

interface socketHandler<T> {
    (this: T, ...args: any[]): void
}

interface Sockets<V> {
    [key: string]: socketHandler<V>
}

declare module 'vue/types/vue' {
    interface Vue {
        // @ts-ignore
        $socket: SocketIOClient.Socket,
        sockets: {
            subscribe(eventName: string, handler: socketHandler<Vue>): void,
            unsubscribe(eventName: string): void,
        }
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<
        V extends Vue,
        Data=DefaultData<V>,
        Methods=DefaultMethods<V>,
        Computed=DefaultComputed,
        PropsDef=PropsDefinition<DefaultProps>,
        Props=DefaultProps> {
        sockets?: Sockets<V>
    }
}

export interface VueSocketOptions {
    debug?: boolean;
    // @ts-ignore
    connection: string | SocketIOClient.Socket,
    vuex?: {
        store?: Store<any>,
        actionPrefix?: string,
        mutationPrefix?: string,
        options?: {
            useConnectionNamespace?: boolean
        }
    },
        // type declarations for optional options
    options?:{
        path?: string;
    }
}

export default class VueSocketIO<T> implements PluginObject<T> {
    constructor (options: VueSocketOptions);
    install: PluginFunction<T>
}
