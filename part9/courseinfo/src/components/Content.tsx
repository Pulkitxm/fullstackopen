import Part from './Part'
import { CoursePart } from '../types'

const Content = ({ courseParts }: { courseParts :CoursePart[]}) => {
    return (<>
            {
                courseParts.map((coursePart, idx) => {
                    return (
                        <Part part={coursePart} key={idx} />
                    )
                })
            }
        </>
    )
}
export default Content