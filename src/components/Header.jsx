import logo from '../assets/hobo.jpeg'
export default  function Header() {
    return (
        <div>
            <div  style={{border:'1px solid black'}}>
                <img src={logo} alt=""  style={{width:'20%', height:'10%'}} />
            </div>

        </div>
    )
}