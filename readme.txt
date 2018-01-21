运行MongoDB
mongod --dbpath G:\work\LOL\web\database\mongodb\data\db --port 27018


/bin/mongod --dbpath /data/db/mongodb/ 远程连接查看原因
mongod --dbpath /data/db/mongodb1/

mongod -f mongodb.conf
db.createUser({user:'admin', pwd:'husky', roles:['userAdminAnyDatabase']})

tmux new -s session 
tmux ls

tmux a -t xujing-v5

60.205.189.160

sudo service mongod restart  

netstat -lanp | grep "27017"  

chkconfig mongod on

如果没有使用--fork，直接可以前台退出终端关闭。通过这种方式，Mongodb将会自己做清理退出，把没有写好的数据写完成，并最终关闭数据文件。要注意的是这个过程会持续到所有操作都完成。

后台运行:

如果使用--fork在后台运行mongdb服务，那么就要通过向服务器发送shutdownServer()消息来关闭。

1、普通命令：
$ ./mongod
> use admin
> db.shutdownServer()

mongod -shutdown -dbpath=/usr/local/mongodb/data
db.system.users.find();

db.copyDatabase("目标数据库","我的数据库","ip地址：端口号");