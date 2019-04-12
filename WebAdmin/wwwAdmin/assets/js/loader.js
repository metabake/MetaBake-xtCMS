document.addEventListener("DOMContentLoaded", onDeviceReady, false)

function onDeviceReady() {
    console.info('deviceready');
    depp.done('deviceready');
}

var responces = [];

depp.define({
  'scripts': [
    '//cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js'
    ,'//cdn.jsdelivr.net/npm/tabulator-tables@4.2.3/dist/js/tabulator.min.js'
    , '/assets/3rd/gridforms.js'
    , '//unpkg.com/axios@0.19.0-beta.1/dist/axios.min.js'
    , ROOT + 'assets/css/spectreBottom.css'
  ]
});

depp.require(['scripts'], function() {
  depp.define({
    'services': [
      '/assets/js/services.js'
    ]
  });
});

depp.require(['services'], function() {
  depp.define({
    'general': [
      '/assets/js/general.js'
    ]
  });
});

depp.require(['general'], function() {
  depp.define({
    'rw': [
      '/assets/js/login.js'
      , '/assets/js/ui.js'
    ],
    'fonts': [
      '#rw'
      ,'css!//fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i'
    ]
  });
});

depp.require(['fonts']);