
/* General Imports --------------------------------------------------------------- */
import React from "react";


/* Routing Imports --------------------------------------------------------------- */
import Link from "react-router-dom/Link";


/* Material UI Imports ----------------------------------------------------------- */
import {
	Card,
	CardMedia,
	Container,
	Typography} from "@material-ui/core";
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Hook Linking Imports --------------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";
import withRouter from "react-router-dom/withRouter";


/* Data -------------------------------------------------------------------------- */


const contentReplacements = {
	"<h6>": "<h6 class='MuiTypography-root MuiTypography-h6'>",
	"<h5>": "<h5 class='MuiTypography-root MuiTypography-h5'>",
	"<h4>": "<h4 class='MuiTypography-root MuiTypography-h4'>",
	"<h3>": "<h3 class='MuiTypography-root MuiTypography-h3'>",
	"<h2>": "<h2 class='MuiTypography-root MuiTypography-h2'>",
	"<h1>": "<h1 class='MuiTypography-root MuiTypography-h1'>",
	"<p>": "<p class='MuiTypography-root MuiTypography-body1'>",
	"<a href=": "<strong><a href=",
	"<a target=": "<strong><a target=",
	"</a>": "</a><strong>",
};


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
	card: {
		position: "relative",
		cursor: "pointer"
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
	},
	articleContent: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(8),
	},
	articleCredit: {
		textAlign: "center"
	}
});


/* Component --------------------------------------------------------------------- */


class Article extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentImage: 0
		};

		this.articleId = this.props.match.params.articleId;
		this.getArticleContent = this.getArticleContent.bind(this);
	}

	getArticleContent(article) {
		const {classes} = this.props;

		for (let stringToReplace in contentReplacements) {
			article.content_html = article.content_html.replace(stringToReplace, contentReplacements[stringToReplace]);
		}

		return (
			<div className="ArticleView">
				<Typography variant="h4" className={classes.headline}>{article.headline}</Typography>
				<Container maxWidth="sm">
					<Card elevation={3} className={classes.card}>
						<CardMedia
							className={classes.cardMedia}
							image={article.images[this.state.currentImage]["filepath_large"]}
							alt={article.images[this.state.currentImage]["description"]}
						/>
					</Card>
					<div className={classes.articleContent + " ArticleContent"}
					     dangerouslySetInnerHTML={{__html: article.content_html}}/>
					<div className={classes.articleCredit}>
						<Typography variant="subtitle2" className={classes.articleCredit}>By {article.author}</Typography>
					</div>
				</Container>
			</div>
		);
	}

	render() {

		const {classes} = this.props;
		const article = this.props.getArticleFromId(this.articleId);

		let articleContent;

		if (article === undefined) {
			articleContent = <Typography variant="h4" className={classes.headline}>Nothing here ...</Typography>;
		} else {
			articleContent = this.getArticleContent(article);
		}

		return (
			<div className="NewsFeedPage">
				<Link to="/news-feed">
					<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
				</Link>
				{articleContent}
			</div>
		);
	}
}

Article.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Article));