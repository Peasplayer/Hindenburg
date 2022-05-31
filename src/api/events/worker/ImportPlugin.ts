import { CancelableEvent } from "@skeldjs/events";
import { PluginLoader, RoomPlugin, SomePluginCtr } from "../../../handlers";

/**
 * Emitted when a plugin is imported to be loaded.
 */
export class WorkerImportPluginEvent extends CancelableEvent {
    static eventName = "worker.importplugin" as const;
    eventName = "worker.importplugin" as const;

    private _alteredPlugin: SomePluginCtr;

    constructor(
        /**
         * The path that is being imported to be loaded.
         */
        public readonly pluginPath: string,
        /**
         * The plugin that has been loaded.
         */
        public readonly plugin: SomePluginCtr
    ) {
        super();

        this._alteredPlugin = plugin;
    }

    /**
     * The plugin that will be imported/used instead, if altered with {@link WorkerImportPluginEvent.setPlugin}.
     */
    get alteredPlugin() {
        return this._alteredPlugin;
    }

    /**
     * Whether or not the plugin was a room plugin, asserts the type of
     * {@link WorkerLoadPluginEvent.plugin} and {@link WorkerLoadPluginEvent.room}.
     */
    isRoomPlugin(): this is { plugin: typeof RoomPlugin } {
        return PluginLoader.isRoomPlugin(this.plugin);
    }

    /**
     * Change the plugin that will be imported/used.
     * @param plugin The plugin to import/use instead.
     */
    setPlugin(plugin: SomePluginCtr) {
        this._alteredPlugin = plugin;
    }
}
