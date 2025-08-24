 

const credentials = (req: { headers: { origin: any; }; }, res: { header: (arg0: string, arg1: boolean) => void; }, next: () => void) => {
    
    res.header('Access-Control-Allow-Credentials', true);
 
    next();
}

module.exports = credentials