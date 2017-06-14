<html>
<head>
	
	<meta charset = "utf-8"></meta>
	<meta name = "viewport" content = "width = device-width"></meta>
	<title>Chris's Bookshelf</title>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
	
</head>
	
<body>
	
	<div class = "container">
		<div id = "root"></div>
	</div>
	
	<script type = "text/babel"></script>
	
		class BookApp extends React.Component{
			constructor(props){
				super(props);
				this.state = {
					data: {{{books}}},
					filter: "",
					curItem: {}
				};
	
				this.onSearchChange = this.onSave.bind(this);
				this.onSave = this.onSave.bind(this);
				this.onDelete = this.onDelete.bind(this);
			}
			
			onSearchChange(entry) {
				this.setState({filter: entry.toLowerCase() });
			}
	
			showDetails(event) {
				let editItem = this.state.data.find((item) => {
					return item._id == event.target.id;
				});
				this.setState({curItem: editItem});
			}
	
		onSave(newItem){
			let newData;
			if (!newItem._id) {}
		}
	}
	
	
</body>
	
</html>