const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function regroupByCategory(){
    const cats = []
    PRODUCTS.forEach(product => {
        if(!cats.includes(product.category)) cats.push(product.category)
    });
    return cats
}

function getInfo(category){
    const categorys = []
    PRODUCTS.forEach(product => {
        if(category == product.category) categorys.push(product)
    });
    return categorys
}

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onSearchChange(e.target.value)
    }
    render(){
        return <div>
            <label htmlFor='Search'>Search</label>
            <input type="text" id='Search' name='Search' placeholder='Search...' value={this.props.search} onChange={this.handleChange}/>
        </div>
    } 
}

class InStock extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onStockChange(e.target.checked)
    }
    render(){
        return <div>
            <label htmlFor='inStock'>Only show prouct in stock</label>
            <input type="checkbox" id='inStock' name='inStock' checked={this.props.inStock} onChange={this.handleChange}/>
        </div>
    } 
}

class PrintProduct extends React.Component{

    render(){
        const stock = this.props.stocked
        let stocked
        if(this.props.checked == true && this.props.stocked == false){
            return <div></div>
        }
        if(this.props.searchWord != undefined && this.props.name.includes(this.props.searchWord) ){
            return <div></div>
        }
        if(stock){ 
            stocked = <div className="col">{this.props.name}</div>
        }
        else{ 
            stocked = <div className="col text-danger" >{this.props.name}</div>
        }
        
        return  <div className="row">
                    {stocked}
                    <div className="col">
                        {this.props.price}
                    </div>
                </div>
    
    }

}

class ProductCategoryRow extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        const infCat = getInfo(this.props.name);
        return <React.Fragment>
                <div className="row">
                    <div className="col">
                        <h1>
                            {this.props.name}
                        </h1>
                    </div>
                </div>
                {infCat.map(({price, name, stocked}) => <PrintProduct checked={this.props.checked} search={this.props.searchWord} price={price} name={name} stocked={stocked} />)}
                </React.Fragment>
    }
}

class ProductTable extends React.Component {

    constructor(props){
        super(props);
    }

  
    render(){
        const productCat = regroupByCategory();
        console.log(this.props.searchWord)
        return <React.Fragment>
                <div class="row">
                    <div class="col">
                        Name
                    </div>
                    <div class="col">
                        Price
                    </div>
                </div>
                    {productCat.map((cat) => <ProductCategoryRow checked={this.props.checked} search={this.props.searchWord} name={cat}/>)}
                </React.Fragment>
    } 

}

class FilterableProductTable  extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            search: '',
            inStock: false
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleStockChange = this.handleStockChange.bind(this)
    }

    handleSearchChange(search) {
        this.setState({search});
    }

    handleStockChange(inStock) {
        this.setState({inStock});
    }

    render() {
        return <div className="container text-center">
            <SearchBar search={this.state.search} onSearchChange={this.handleSearchChange}/>
            <InStock inStock={this.state.inStock} onStockChange={this.handleStockChange}/>
            <ProductTable checked={this.state.inStock} searchWord={this.state.search}/>
        </div>;
    }
}
ReactDOM.render(<FilterableProductTable />, window.document.getElementById("app"))