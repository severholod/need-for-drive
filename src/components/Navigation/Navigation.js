import React from 'react'
import {menuStatusChange} from '../../redux/actions';
import {connect} from 'react-redux';
import {Menu} from '../Menu/Menu';

export let Navigation = ({isMenuActive, onMenuStatusChange}) => {
    return (
        <div className={`navigation ${isMenuActive ? 'active' : ''}`}>
            <div className="overlay" onClick={onMenuStatusChange}></div>
            <Menu onMenuStatusChange={onMenuStatusChange}/>
            <aside className="sidebar">
                <div className="nav-toggler" onClick={onMenuStatusChange}>
                    <span className="nav-toggler__line nav-toggler__line_first"></span>
                    <span className="nav-toggler__line nav-toggler__line_second"></span>
                    <span className="nav-toggler__line nav-toggler__line_third"></span>
                </div>
                <div className="lang-toggler">
                    Eng
                </div>
            </aside>
        </div>
    )
}
const mapStateToProps = ({isMenuActive}) => {
    return {
        isMenuActive
    }
}
const mapDispatchToProps = {
    onMenuStatusChange: menuStatusChange,
}
Navigation = connect(mapStateToProps,mapDispatchToProps)(Navigation)