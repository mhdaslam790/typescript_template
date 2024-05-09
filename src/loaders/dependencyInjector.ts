import Container from 'typedi';
import { IModelDI } from '../types/dependencyInjector';
import { loggerDev } from '../utils/logger';

const dependencyInjector = async ({
    models,
}: {
    models: IModelDI[];
}
): Promise<void> => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        Container.set('logger', loggerDev);
        
    } catch (error) {
        loggerDev.error(`Error on dependency injector loader: ${error}`);
        throw error;
    }
}
export { dependencyInjector };
export default dependencyInjector;