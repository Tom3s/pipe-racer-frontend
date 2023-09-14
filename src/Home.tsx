import { Fragment } from "react"
import { Title } from "./Elements/Title"
import "./Auth/FormStyle.css"
import { Button } from "react-bootstrap"

export const Home = () => {
	return (
		<Fragment>
			<div className="form_div" style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				
			}}>
			<Title />
			Under Construction...
			<a href={"/profile?id=" + localStorage.getItem("userId")}>Profile</a>
			<Button className="form_button" variant="dark" href="/login" >Login</Button>
			<Button className="form_button" variant="dark" href="/register">Register</Button>
			</div>
		</Fragment>
	)
}