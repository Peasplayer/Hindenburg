import { Networkable, NetworkableConstructor } from "@skeldjs/core";
import { SomePluginCtr } from "../../handlers";

const hindenburgRegisterPrefab = Symbol("hindenburg:registerprefab");

export interface RegisteredPrefab {
    spawnType: number;
    components: NetworkableConstructor<Networkable>[];
}

export function RegisterPrefab(spawnType: number, components: NetworkableConstructor<Networkable>[]) {
    return function (target: any) {
        const cachedSet: RegisteredPrefab[]|undefined = Reflect.getMetadata(hindenburgRegisterPrefab, target);
        const prefabsToRegister = cachedSet || [];
        if (!cachedSet) {
            Reflect.defineMetadata(hindenburgRegisterPrefab, prefabsToRegister, target);
        }

        prefabsToRegister.push({
            spawnType,
            components
        });
    };
}

export function getPluginRegisteredPrefabs(pluginCtr: SomePluginCtr): RegisteredPrefab[] {
    return Reflect.getMetadata(hindenburgRegisterPrefab, pluginCtr) || [];
}
