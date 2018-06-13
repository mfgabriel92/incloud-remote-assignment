<?php

namespace App\Repository;

use App\Entity\Task;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Task|null find($id, $lockMode = null, $lockVersion = null)
 * @method Task|null findOneBy(array $criteria, array $orderBy = null)
 * @method Task[]    findAll()
 * @method Task[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Task::class);
    }

    public function fetchAll()
    {
        return $this->getEntityManager()->createQueryBuilder()
            ->select("t.id, t.description, t.duration, t.concludedAt")
            ->from(Task::class, "t")
            ->orderBy("t.createdAt", "DESC")
            ->getQuery()
            ->getResult(Query::HYDRATE_ARRAY);
    }
}
