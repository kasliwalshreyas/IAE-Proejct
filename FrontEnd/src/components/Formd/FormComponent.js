import React from 'react'
import classes from "./Formd.module.css";

function FormComponent(props) {
    const qnTitle = props.qnTitle;
    const qnNo = props.qnNo;

  return (
    <>
        <tr>
          <th id="qn1">{props.qnTitle}</th>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="1"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="2"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="3"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="4"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="5"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="6"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="7"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="8"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="9"
            />
          </td>

          <td>
            <input
              className={classes.th1}
              type="radio"
              id={props.qnNo}
              name={props.qnNo}
              value="10"
            />
          </td>
        </tr>
    </>
  )
}

export default FormComponent