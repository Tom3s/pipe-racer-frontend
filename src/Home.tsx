import { Fragment, useEffect, useState } from "react"
import { Title } from "./Elements/Title"
import "./Auth/FormStyle.css"
import { Button } from "react-bootstrap"
import ControlsImage from "./Images/keyboard-layout.png"
import LeaderboardImage from "./Images/Leaderboard.png"
import EditorImage from "./Images/Editor.png"
import IngameImage from "./Images/Ingame.png"
import CrossplatformImage from "./Images/Crossplatform.png"
import { osName } from "react-device-detect"

export const Home = () => {

	const defaultDownloadLink = "https://github.com/Tom3s/pipe-racer/releases/latest/download/PipeRacer.exe";
	const linuxDownloadLink = "https://github.com/Tom3s/pipe-racer/releases/latest/download/PipeRacer.x86_64";
	const macOsDownloadLink = "https://github.com/Tom3s/pipe-racer/releases/latest/download/PipeRacer.zip";
	const [downloadLink, setDownloadLink] = useState(defaultDownloadLink);
	const [os, setOs] = useState(osName);

	useEffect(() => {
		const os = osName;
		switch (os) {
			case "Windows":
				setDownloadLink(defaultDownloadLink);
				// setOs(os);
				break;
			case "Linux":
				setDownloadLink(linuxDownloadLink);
				// setOs(os);
				break;
			case "Mac OS":
				setDownloadLink(macOsDownloadLink);
				// setOs(os);
				break;
			default:
				setDownloadLink(defaultDownloadLink);
				setOs("Windows")
				break;
		}
	}, []);


	return (
		<Fragment>
			<div className="form_div" style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "fit-content",

			}}>
				<Title />
				<hr />
				{/* Under Construction... */}
				<div style={{
					display: "flex",
					flexDirection: "column",
				}}>
					<div style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: "20px",
						width: "",
					}}>
						<div style={{
							flexGrow: 2,
							textAlign: "center",
						}}>
							<h1>SIMPLE CONTROLS - HIGH SKILL CEILING</h1>
							<p>Learn the basics in minutes and enjoy the game for years</p>
							<p>This high precision racing game will push you to your limits if you want to stay on top</p>
							<p>There are no gimmicks or tricks, just pure racing for you to enjoy</p>

						</div>
						<div style={{
							marginLeft: "20px",
						}}>
							<img src={ControlsImage} style={{
								height: "400px",
								borderRadius: "15px",
								flexGrow: 1,
							}} />
						</div>

					</div>
					<hr />
					<div style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: "20px",
						width: "",
					}}>
						<div style={{
							marginRight: "20px",
						}}>
							<img src={IngameImage} style={{
								height: "400px",
								borderRadius: "15px",
								flexGrow: 1,
							}} />
						</div>
						<div style={{
							flexGrow: 2,
							textAlign: "center",
						}}>
							<h1>PLAY WITH YOUR FRIENDS</h1>
							<p>Any game can become 110% more fun when you play it with your friends</p>
							<p>Play together with your buddies in local multiplayer {'('}up to 4 players{')'}<br />
								Or play online with people from all around the world</p>

						</div>

					</div>
					<hr />
					<div style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: "20px",
						width: "",
					}}>
						<div style={{
							flexGrow: 2,
							textAlign: "center",
						}}>
							<h1>COMPETE TO BECOME #1</h1>
							<p>Push the car to its limits to achieve record times</p>
							<p>Compete with other players and rise to the top {'('}Or just play for fun and enjoy the game{')'}</p>
							<p>The more tracks you conquer, the more points you will gain on the global Leaderboard</p>

						</div>
						<div style={{
							marginLeft: "20px",
						}}>
							<img src={LeaderboardImage} style={{
								height: "400px",
								borderRadius: "15px",
								flexGrow: 1,
							}} />
						</div>

					</div>
					<hr />
					<div style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: "20px",
						width: "",
					}}>
						<div style={{
							marginRight: "20px",
						}}>
							<img src={EditorImage} style={{
								height: "400px",
								borderRadius: "15px",
								flexGrow: 1,
							}} />
						</div>
						<div style={{
							flexGrow: 2,
							textAlign: "center",
						}}>
							<h1>BUILD YOUR OWN TRACKS</h1>
							<p>Use the in-game editor to create your own tracks</p>
							<p>Let your creativity run wild and create the track of your dreams</p>
							<p>Decorate your track with signs {'('}you may even use your friend's face{')'}</p>
							<p>Share them with the world and see how other players like your creation</p>


						</div>

					</div>
					<hr />
					<div style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: "20px",
						width: "",
					}}>
						<div style={{
							flexGrow: 1,
							textAlign: "center",
						}}>
							<h1>CROSS-PLATFORM</h1>
							<p>Play this game anywhere you want</p>
							<p>Currently supported platforms are Windows, Linux and macOS</p>
							<p>Play with your friends on different platforms</p>
							<Button variant="primary"
								style={{
									marginRight: "10px",
									fontSize: "22px",
									padding: "10px 20px",
									// width: "40px",
									// height: "40px",
									borderRadius: "15px",
								}}
								href={downloadLink}
							><span style={{ fontSize: "50px" }}>{os} </span><i className="fa fa-download" style={{ fontSize: "50px" }} /></Button>
						</div>
						<div style={{
							marginLeft: "20px",
						}}>
							<img src={CrossplatformImage} style={{
								height: "400px",
								width: "800px",
								// overflow: "hidden",
								objectFit: "contain",
								borderRadius: "15px",
								flexGrow: 1,
							}} />
						</div>

					</div>
				</div>
			</div>
		</Fragment>
	)
}