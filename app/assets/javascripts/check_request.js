function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

if(!inIframe()) {
	window.location.href = "/?request="+window.location.href;
}
else {
	window.parent.history.pushState('HSP', 'HitSharePlay',location.href);
}