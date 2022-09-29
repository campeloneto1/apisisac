<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPromocao extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users_promocoes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['subunidade', 'graduacao', 'user'];

    public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function graduacao()
    {
        return $this->belongsTo(Graduacao::class);
    }

     public function user()
    {
        return $this->belongsTo(User::class);
    }
}
