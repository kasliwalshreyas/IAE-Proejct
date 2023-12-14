import Jobs from './Jobs'
import classes from './Joblist.module.css'
const Joblist = (props)=>
{
    // console.log(props.details,'joblist props')
    return (
        <ul>

            {
            props.details?.map((i)=>
            (
                <Jobs 
                fromSalary={i.fromSalary}
                toSalary = {i.toSalary}
                title={i.title}
                company= {i.company}
                category= {i.category}
                location = {i.city}
                
                />
            ))}
        </ul>
    )
}

export default Joblist;