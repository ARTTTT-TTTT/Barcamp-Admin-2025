const isProd = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

const config = {
    isProd,
    apiPrefix: isProd ? '/api' : 'http://localhost:8080/api',
    apidatabaseVotePrefix : isProd ? '/api2' : 'http://localhost:8081/api2',
}


export default config