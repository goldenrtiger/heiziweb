����MongoDB
mongod --dbpath G:\work\LOL\web\database\mongodb\data\db1 --port 27018

mongod --dbpath G:\work\LOL\web\database\mongodb\data\fromheiziwebnew

mongod --dbpath G:\work\LOL\web\database\mongodb\data\db1 --replSet myDevReplSet
mongo-connector -m 127.0.0.1:27017 -t 127.0.0.1:9200 -d elastic2_doc_manager

db.Tab.remove({"id":"bar"})

/bin/mongod --dbpath /data/db/mongodb/ Զ�����Ӳ鿴ԭ��
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

���û��ʹ��--fork��ֱ�ӿ���ǰ̨�˳��ն˹رա�ͨ�����ַ�ʽ��Mongodb�����Լ��������˳�����û��д�õ�����д��ɣ������չر������ļ���Ҫע�����������̻���������в�������ɡ�

��̨����:

���ʹ��--fork�ں�̨����mongdb������ô��Ҫͨ�������������shutdownServer()��Ϣ���رա�

1����ͨ���
$ ./mongod
> use admin
> db.shutdownServer()

mongod -shutdown -dbpath=/usr/local/mongodb/data
db.system.users.find();

db.copyDatabase("Ŀ�����ݿ�","�ҵ����ݿ�","ip��ַ���˿ں�");
db.copyDatabase("mylist","remote","60.205.189.160:27017");

db.getCollection('Tab').ensureIndex({content:"�׽���"})
db.getCollection('Tab').ensureIndex({content:"text"})