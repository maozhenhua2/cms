var pageMenus = [
  {
    'icon': 'fa fa-th-large',
    'title': 'map & chart',
    'url': 'home/dashboard',
  }, {
	  'icon': 'fa fa-key',
	  'title': 'Login & Register',
	  'url': '',
	  'caret': 'true',
	  'submenu': [{
	    'url': 'login',
	    'title': 'Login'
	  },{
	    'url': 'register',
	    'title': 'Register'
	  }]
	}
];

export default pageMenus;
