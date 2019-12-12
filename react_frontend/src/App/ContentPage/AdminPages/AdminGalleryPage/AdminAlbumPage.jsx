/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import Switch from "react-router-dom/Switch"
import Route from "react-router-dom/Route"
import Link from "react-router-dom/Link"


/* Material UI Imports ----------------------------------------------------------- */
import {
	Typography,
	Grid} from "@material-ui/core";
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Component Imports ------------------------------------------------------------- */
import AdminAlbumPageImage from "./AdminAlbumPageImage";
import EditImagePage from './EditImagePage';


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
import withRouter from "react-router-dom/withRouter";


/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	backIcon: {
		position: "absolute",
		top: theme.spacing(1),
		left: theme.spacing(1),
	},
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
	},
	buttonRow: {
		display: "flex",
		position: 'relative',
		alignItems: "center",
		justifyContent: "center"
	},
	buttonSpinnerWrapper: {
		position: 'relative',
		display: "inline-flex",
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	card: {
		position: "relative",
		cursor: "pointer",
		minWidth: 250
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
	},
	cardContent: {
		padding: theme.spacing(1),
		margin: 0,
		"&:last-child": {
			padding: theme.spacing(1),
		},
		display: "flex",
		position: "relative"
	},
	textField: {
		alignSelf: "flex-end",
		marginRight: theme.spacing(4),
	},
	deleteIcon: {
		cursor: "pointer",
		position: "absolute",
		right: theme.spacing(1),
		bottom: theme.spacing(1),
	},
	visibilityBox: {
		display: "flex",
		justifyContent: "left",
		alignItems: "center",
		flexDirection: "row",
		marginTop: theme.spacing(2)
	},
	visibilityIcon: {
		marginRight: theme.spacing(2),
		cursor: "pointer",
		alignSelf: "flex-start"
	},
	visibilityText: {
		alignSelf: "flex-start"
	},
	removeIcon: {
		cursor: "pointer",
		position: "absolute",
		right: theme.spacing(2),
		bottom: theme.spacing(2),
	}
});


/* Component --------------------------------------------------------------------- */


class AdminAlbumPage extends React.Component {

	constructor(props) {
		super(props);

		this.albumId = this.props.match.params.albumId;

		this.getImageList = this.getImageList.bind(this);
		this.updateState = this.updateState.bind(this);
		this.removeImageFromView = this.removeImageFromView.bind(this);
	}

	getImageList(album) {
		const {classes} = this.props;

		if (album.images.length === 0) {
			return <Typography variant="h6" className={classes.headline}>No images ...</Typography>;
		}

		let imageList = album.images.map((image, index) => {
			return (
				<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
					<AdminAlbumPageImage path={"/admin/gallery/" + album.id + "/" + image.id}
					                     image={image}
					                     index={index}
					                     updateState={this.updateState}
					                     api={this.props.api}
					                     removeImageFromView={this.removeImageFromView}/>
				</Grid>
			);
		});

		return (
			<Grid container spacing={2}>
				{imageList}
			</Grid>
		);
	}

	updateState(index, image) {
		this.props.updateImageState(this.albumId, index, image);
	}

	removeImageFromView(index) {
		this.props.removeImageFromView(this.albumId, index);
	}

	render() {

		const {classes} = this.props;

		const album = this.props.getAlbumFromId(this.albumId);
		let albumContent;

		if (album === undefined) {
			albumContent = (
				<React.Fragment>
					<Typography variant="h4" className={classes.headline}>Nothing here ...</Typography>
				</React.Fragment>
			);
		} else {
			albumContent = (
				<React.Fragment>
					<Typography variant="h4" className={classes.headline}>{album.name}</Typography>
					{this.getImageList(album)}
				</React.Fragment>
			);
		}

		return (
			<div className="AdminGalleryPage">
				<Link to="/admin/gallery">
					<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
				</Link>
				<Switch>
					<Route exact path={"/admin/gallery/" + this.albumId}>
						{albumContent}
					</Route>
					<Route path={"/admin/gallery/:albumId/:imageId"}>
						<EditImagePage api={this.props.api}
						               albumIds={this.props.albumIds}
						               albumIdtoNameDict={this.props.albumIdtoNameDict}
						               album={album}
						               triggerReload={this.props.triggerReload}/>
					</Route>
				</Switch>
			</div>
		);
	}
}

AdminAlbumPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AdminAlbumPage));