import { SendOption } from "@skeldjs/constant";
import { BaseRootPacket, MessageDirection, PacketDecoder } from "@skeldjs/protocol";
import { HazelReader, HazelWriter, VersionInfo } from "@skeldjs/util";

export class ModdedHelloPacket extends BaseRootPacket {
    static tag = SendOption.Hello as const;
    tag = SendOption.Hello as const;

    nonce!: number;
    clientver!: VersionInfo;
    username!: string;
    token!: number;
    protocolver!: number;
    modcount!: number;

    constructor(
        nonce: number,
        clientver: VersionInfo,
        username: string,
        token: number,
        protocolver: number,
        modcount: number,
    ) {
        super();

        this.nonce = nonce as number;
        this.clientver = clientver as VersionInfo;
        this.username = username as string;
        this.token = token as number;
        this.protocolver = protocolver as number;
        this.modcount = modcount as number;
    }

    static Deserialize(reader: HazelReader) {
        const nonce = reader.uint16(true);
        reader.jump(1); // Skip hazel version.
        const clientver = reader.read(VersionInfo);
        const username = reader.string();
        const token = reader.uint32();
        const protocolversion = reader.uint8();
        const modcount = reader.packed();

        return new ModdedHelloPacket(
            nonce,
            clientver,
            username,
            token,
            protocolversion,
            modcount
        );
    }

    Serialize(writer: HazelWriter) {
        writer.uint16(this.nonce, true);
        writer.write(this.clientver);
        writer.string(this.username);
        writer.uint32(this.token);
        writer.uint8(this.protocolver);
        writer.packed(this.modcount);
        writer.uint8(this.protocolver);
        writer.packed(this.modcount);
    }
}