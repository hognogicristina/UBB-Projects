$(document).ready(function () {
    const menuData = [
        // this menuData is an array of objects
        { name: 'Menu 1', submenu: ['Submenu 1', 'Submenu 2', 'Submenu 3'] },
        { name: 'Menu 2', submenu: ['Submenu 1', 'Submenu 2'] },
        { name: 'Menu 3', submenu: ['Submenu 1', 'Submenu 2', 'Submenu 3', 'Submenu 4'] }
    ]
    
    // this function creates a link with text
    const createLink = text => $('<a>').attr('href', '#').text(text)
    
    // this function creates a menu item with submenu
    const createMenuItem = ({ name, submenu }) => {
    const submenuItems = submenu.map(createLink)
    const submenuList = $('<ul>').addClass('submenu').append(submenuItems)
    return $('<li>').append(createLink(name), submenuList)
    }
    
    // create menu and append it to nav
    const menuItems = menuData.map(createMenuItem)
    const menu = $('<ul>').addClass('menu').append(menuItems)
    $('nav').append(menu)

    // set styles for nav and menu
    $('nav').css({
        'background-color': '#333',
        'padding': '10px 0'
    })
    $('.menu').css({
        'list-style': 'none',
        'margin': '0',
        'padding': '0',
        'display': 'flex',
        'justify-content': 'space-between',
        'max-width': '900px',
        'margin': '0 auto'
    })

    // set styles for menu items
    $('.menu li').css({
        'position': 'relative',
        'margin': '0 20px'
    })
    $('.menu a').css({
        'display': 'block',
        'padding': '10px',
        'color': '#fff',
        'text-decoration': 'none'
    })

    // set styles for submenus
    $('.submenu').css({
        'position': 'absolute',
        'top': '100%',
        'left': '0',
        'z-index': '1',
        'padding': '10px',
        'margin': '0',
        'list-style': 'none',
        'background-color': '#333',
        'display': 'none'
    })
    $('.submenu li').css({
        'margin': '10px 0'
    })
    $('.submenu a').css({
        'padding': '5px 0'
    })

    // show/hide submenu on click
    $('.menu li').on('click', function () {
        var submenu = $(this).find('.submenu')
        submenu.slideToggle()
    })

    // add active class on click
    $('.menu li').on('click', function () {
        $(this).toggleClass('active')
        $(this).siblings().removeClass('active')
    })
})