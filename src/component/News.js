import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

   capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }

    constructor(props){
      super(props);

      this.state = {
        articles :  [],
        loading : true,
        page : 1,
        totalResults: 0
      }
      document.title = `NewsBurst - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee3479e099421092f363ddbd3b6b80&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     

      try{
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
          articles: parsedData.articles ,
          totalResults : parsedData.totalResults,
          loading : false
          })
       
          this.props.setProgress(100);
      }
      catch(err){
          console.log(err);
      }
    }

    async componentDidMount() {
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee3479e099421092f363ddbd3b6b80&page=1&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true})

      // try{
      //   let data = await fetch(url);
      //   let parsedData = await data.json();
      //   this.setState({
      //     articles: parsedData.articles ,
      //     totalArticles : parsedData.totalResults,
      //     loading : false
      //     })
       
      // }
      // catch(err){
      //     console.log(err);
      // }
      this.updateNews();
    }
    
    handlePrevClick=async()=> {
    //    this.setState({loading : true});
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee3479e099421092f363ddbd3b6b80&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
        

    //      this.setState({

    //       page : this.state.page - 1,
    //       articles: parsedData.articles,
    //       loading: false
    //      })
    this.setState({page:this.state.page - 1})
    this.updateNews();
    }
    // }
    
    handleNextClick=async()=> {

      // if(this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)){
           


      // } else {

      //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee3479e099421092f363ddbd3b6b80&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      //   this.setState({loading : true});
      //   let data = await fetch(url);
      //   let parsedData = await data.json();
      //   console.log(this.state.totalArticles);
        
      //   this.setState({
          
      //     page : this.state.page + 1,
      //     articles: parsedData.articles,
      //     loading: false
          
      //   })
      // }
      this.setState({page:this.state.page + 1})
      this.updateNews();
      }

      fetchMoreData = async() => {

      this.setState({page: this.state.page + 1})

      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2ee3479e099421092f363ddbd3b6b80&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      

      try{
        let data = await fetch(url); 
        let parsedData = await data.json();
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults : parsedData.totalResults,
          loading : false
          })
       
      }
      catch(err){
          console.log(err);
      }

      }
      
  render() {
    return (
      <div className='container my-3 '>
        <h1 className='text-center'>NewsHeadline - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="row my-4 container">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4 my-4 container" key={element.url}>
           <NewsItem  title={element.title} description={element.description?element.description.slice(0,88):""} 
           imageUrl={!element.urlToImage?"https://ichef.bbci.co.uk/news/1024/branded_news/1120D/production/_130675107_scoutsafp.jpg":element.urlToImage} newsUrl= {element.url} author={element.author} 
           date={element.publishedAt} source={element.source.name}/>
           </div>
          })}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next</button>
        </div> */}
      </div>
    )
  }
}
