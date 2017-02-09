var DataList = React.createClass({
  getInitialState: function(){
    return {
      data: []
    };
  },
  componentWillMount: function() {
    var query = "";
    if ($('#react-dataList').attr("data-user").length) {
      query = $('#react-dataList').attr("data-user");
    }
    // if (getQueryVariable("UserGroup") !== false) { 
    //   query = getQueryVariable("UserGroup");
    //  }  
      source = this.props.source + "&UserGroup=" + query;        
      $.getJSON(source, function(result) { 
        // console.log(result.length);
        console.log(result);
        var data = result
        filteredresult = _.reduce(data, function(result, value, key) {
          var prev = key - 1;
          if(data[prev] != undefined ) {
           
            var addressCurrent = data[key].name;                   
            var addressPrevious = data[prev].name;     
            if(addressCurrent !== addressPrevious) {            
              return result = _.concat(result, value);
            } else {
              return result;
            }
          } else {
            return result = _.concat(result, value);
          }
        }, []);
        console.log(filteredresult)
          this.setState({
            data: filteredresult
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
    var role = "";
    if (this.props.source["role"] == "99") {
      role = "Consultant Vanzari"
    }
    if (this.props.source["role"] == "98") {
      role = "Asistenta Vanzari"
    }
    return (
      <div className="item">
        <p className="role"><strong>Date contact {role}</strong></p>
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