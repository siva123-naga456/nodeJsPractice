const  express=require("express");
const {open}=require("sqlite");
const sqlite3=require("sqlite3")
const path=require("path")

const app=express()

const dbPath=path.join(__dirname,"cricketTeam.db");

app.use(express.JSON())
const db=null;
const initDatabaseAndServerStart = async()=>{
    try{
        const db = await open({
        filename=dbPath
        driver=sqlite3.Database
    })

    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}
initDatabaseAndServerStar();

const convertDbObjectToResponseObject = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.role,
  };
};

app.get('/players/', async(request,response)=>{
         const getQuery=`select * from cricket_team order by player_id`;
         const result= await db.all(getQuery)
         response.send(result.map((eachPlayer) =>
                    convertDbObjectToResponseObject(eachPlayer)
));
})

app.post('/players/', async(request,response)=>{
         const details=request.body;
         const { player_id,player_name,jersey_number,role}=details;

         const postQuery=`insert into cricket_team(player_id,player_name,jersey_number,role) values(${playerId},
            `${playerName}` ,${jerseyNumber},`${role}`)`;
         const result= await db.run(postQuery)
         response.send("Player Added to Team");
})
app.get('/players/:playerId/', async(request,response)=>{
         const {playerId}=request.params;
         const getsQuery=`select * from cricket_team where player_id=playerId`;
         const results= await db.run(getsQuery)
         response.send(results.map((eachPlayer) =>
                    convertDbObjectToResponseObject(eachPlayer)
));
})

app.put('/players/:playerId/', async(request,response)=>{
         const{playerId}=request.params;
         const details=request.body;
         const {player_name,jersey_number,role}=details;

         const putQuery=`update cricket_team set player_name=`${player_name}`,jersey_number=${jersey_number},role=`${role}`
         where player_id= playerId`;
         const result= await db.run(putQuery)
         response.send("Player Details Up");
})

app.delete('/players/:playerId/', async(request,response)=>{
         const {playerId}=request.params;
         const deleteQuery=`delete from cricket_team where player_id=playerId`;
         const results= await db.run(deleteQuery)
         response.send("Player Removed");
})

module.exports=app;
