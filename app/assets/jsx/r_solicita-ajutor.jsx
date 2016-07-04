var DataList = React.createClass({
  getInitialState: function(){
    return {
      data: []
    };
  },
  componentWillMount: function() {
    var query = "";
    if (getQueryVariable("UserGroup") !== false) { 
      query = getQueryVariable("UserGroup");
     }  
      source = this.props.source + "&UserGroup=" + query;
      console.log(source);     
      $.getJSON(source, function(result) {       
          this.setState({
            data: result
          }); 
      }.bind(this));
   

  }, 
  eachItem: function(item, i) {
    return (
      <DataItem key={i} source={this.state.data[i]} />
    );
  },
  render: function() {     
    return (
      <div className="col-xs-12">
        {this.state.data.map(this.eachItem)}
      </div>
    );
  }
});
var DataItem = React.createClass({  
  render: function() {  
    var mailTo = "mailto:" + this.props.source["email"];   
    return (
      <div className="item">
        <p className="name"><strong>Nume:</strong> {this.props.source["name"]}</p>
        <a href={mailTo} className="email"><strong>Email:</strong> <span>{this.props.source["email"]}</span></a>
        <p className="phone"><strong>Telefon:</strong> {this.props.source["phone"]}</p>
      </div>
    );
  }
});

if (document.getElementById('react-dataList') !== null ){
  ReactDOM.render(<DataList source="/Default.aspx?Id=1095" id="0" />, document.getElementById('react-dataList'));
} 