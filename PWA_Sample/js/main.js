window.onload = () => {
    'use strict';
    console.log('page load!');
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js', {scope: '.'})
            .then(registration => {
                console.log('ServiceWorker registration sucessfull with scope: ', registration.scope);
            }, error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    }
}