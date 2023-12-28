export default class RopaDTO {
    static getRopsInputFrom = (ropa) =>{
        return {
            name: ropa.name||'',
            waist:ropa.waist||'',
            image: ropa.image||'',
            color: ropa.color,
        }
    }
}
