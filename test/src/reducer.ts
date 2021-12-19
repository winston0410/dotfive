import type { IAction, IData } from './types';
import { IDataType, IMutation } from './types'
import itemStore from './store/items'

const genericReducer = (store, data: IAction<IData>) => {
    switch (data.mutation) {
        case IMutation.Create: {
            store.update((prev) => {
                return [...prev, data.payload]
            })
            break;
        }
        
        case IMutation.Remove: {
            store.update((prev) => {
                const updated = prev.filter((item) =>  item.id !== data.payload.id)
                return updated
            })
            break;
        }
        
        case IMutation.Update: {
            store.update((prev) => {
                const copied = [...prev]
                const index = copied.findIndex((item) => item.id === data.payload.id)
                copied[index] = data.payload
                return copied
            })
            break;
        }

        default:
            break;
    }
}

const reducer = (data: IAction<IData>): void => {
    switch (data.type) {
        case IDataType.Label: {
            genericReducer(itemStore, data)
            break;
        }

        default:
            break;
    }
}


export default reducer
