declare const _default: (() => {
    type: string;
    url: string;
    entities: string[];
    synchronize: boolean;
    logging: string[];
    dropSchema: boolean;
    ssl: {
        rejectUnauthorized: boolean;
    };
    timezone: string;
    extra: {
        parseInputDatesAsUTC: boolean;
        writeDatesAsUTC: boolean;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    url: string;
    entities: string[];
    synchronize: boolean;
    logging: string[];
    dropSchema: boolean;
    ssl: {
        rejectUnauthorized: boolean;
    };
    timezone: string;
    extra: {
        parseInputDatesAsUTC: boolean;
        writeDatesAsUTC: boolean;
    };
}>;
export default _default;
