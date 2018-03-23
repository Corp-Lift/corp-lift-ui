let Observer = null;

export const registerApp = vue => {
    Observer = vue;
};

export const publishEvent = (event, data) => {
    Observer.$emit(event, data);
};

export const subscribeEvent = (event, callBack) => {
    Observer.$on(event, callBack);
};