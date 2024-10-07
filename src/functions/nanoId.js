import { nanoid } from "@reduxjs/toolkit"

const nanoId = () => {
    const model = nanoid()
    return model.id
}
export default nanoId