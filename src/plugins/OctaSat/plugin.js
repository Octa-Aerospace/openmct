function OctaSatPlugin() {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: 'OctaSat',
            key: 'OctaSat'
        });
    }
}