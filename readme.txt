����MongoDB
mongod --dbpath G:\work\LOL\web\database\mongodb\data\db --port 27018


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